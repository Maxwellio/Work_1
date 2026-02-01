package patrubki.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * Заглушка UserDetailsService: один тестовый пользователь в памяти.
 * В дальнейшем — загрузка из БД (схема substitute).
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private static final String TEST_USERNAME = "test";
    private static final String TEST_PASSWORD = "test";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (!TEST_USERNAME.equals(username)) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return User.builder()
                .username(TEST_USERNAME)
                .password("{noop}" + TEST_PASSWORD)
                .authorities(Collections.emptyList())
                .build();
    }
}
